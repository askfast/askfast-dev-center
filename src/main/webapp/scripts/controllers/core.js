define(["require", "exports", 'controllers/controllers'], function (require, exports, controllers) {
    'use strict';
    var coreController = controllers.controller('core', ["$rootScope", "$q", "$location", "$timeout", "AskFast", "Store", "moment", function ($rootScope, $q, $location, $timeout, AskFast, Store, moment) {
        Store = Store('data');
        var vm = this;
        vm.currentSection = 'dialogs';
        vm.setSection = function (selection) {
            vm.currentSection = selection;
        };
        vm.types = [
            'Phone',
            'SMS',
            'Gtalk',
            'Email',
            'Twitter'
        ];
        vm.adapterTypes = {
            call: {
                label: 'Phone',
                ids: []
            },
            xmpp: {
                label: 'Gtalk',
                ids: []
            },
            email: {
                label: 'Email',
                ids: []
            },
            twitter: {
                label: 'Twitter',
                ids: []
            },
            sms: {
                label: 'SMS',
                ids: []
            }
        };
        vm.channel = {
            type: null,
            adapter: null
        };
        vm.forms = {};
        vm.candidates = [];
        vm.channelTypeSelected = function () {
            var candidates = [];
            angular.forEach(vm.adapterTypes, function (type) {
                if (type.label == vm.channel.type) {
                    angular.forEach(type.ids, function (id) {
                        angular.forEach(vm.adapters, function (adapter) {
                            if (adapter.configId == id)
                                candidates.push(adapter);
                        });
                    });
                }
            });
            vm.candidates = candidates;
        };
        vm.dialogAuth = {
            open: false,
            message: '',
            messageType: ''
        };
        vm.resetAdapterMenu = function () {
            vm.channel.type = null;
            vm.channel.adapter = null;
        };
        vm.Adapter = {
            list: function (callback) {
                vm.adapterType = '';
                AskFast.caller('getAdapters')
                    .then(function (adapters) {
                    angular.forEach(adapters, function (adapter) {
                        if (adapter.adapterType in vm.adapterTypes) {
                            var ids = vm.adapterTypes[adapter.adapterType].ids;
                            if (ids.indexOf(adapter.configId) == -1)
                                ids.push(adapter.configId);
                        }
                    });
                    Store.save(vm.adapterTypes, 'adapterTypes');
                    vm.adapters = adapters;
                    if (callback)
                        callback.call(null, adapters);
                });
            },
            add: function (adapter) {
                var _this = this;
                AskFast.caller('createAdapter', {
                    second: adapter.configId
                }).then(function () {
                    _this.list();
                    // reset adapter add form
                    vm.adapterType = '';
                });
            },
            updateDialog: function (adapter) {
                var _this = this;
                if (adapter.dialogId === null) {
                    adapter.dialogId = '';
                }
                if (adapter.updateFeedback) {
                    adapter.updateFeedback = '';
                }
                adapter.updateFeedback = 'glyphicon glyphicon-refresh';
                AskFast.caller('updateAdapter', { second: adapter.configId }, { dialogId: adapter.dialogId })
                    .then(function (updatedAdapter) {
                    if (updatedAdapter.error) {
                        adapter.updateFeedback = 'glyphicon glyphicon-exclamation-sign';
                        _this.errorNotification = 'Something went wrong, try again.' +
                            'If it keeps happening, please contact info@ask-fast.com. Response status: ' +
                            updatedAdapter.error.status;
                        ;
                    }
                    else {
                        adapter.dialogId = updatedAdapter.dialogId;
                        adapter.updateFeedback = 'glyphicon glyphicon-ok-circle';
                    }
                });
            },
            errorNotification: '',
            query: function (type) {
                AskFast.caller('freeAdapters', {
                    adapterType: type
                })
                    .then(function (result) {
                    vm.freeAdapters = result;
                });
            },
            remove: function (adapter) {
                var _this = this;
                AskFast.caller('removeAdapter', {
                    second: adapter.configId
                }).then(function () {
                    _this.list();
                });
            }
        };
        vm.Adapter.list();
        vm.Dialog = {
            list: function (callback) {
                AskFast.caller('getDialog')
                    .then(function (dialogs) {
                    vm.dialogs = dialogs;
                    vm.loadingDialogs = true;
                    if (callback)
                        callback.call();
                });
            },
            add: function (dialog) {
                var _this = this;
                if (dialog.form.name && dialog.form.url) {
                    AskFast.caller('createDialog', null, {
                        name: dialog.form.name,
                        url: dialog.form.url
                    })
                        .then(function (result) {
                        vm.addingDialog = false;
                        _this.list(function () {
                            vm.setSection('dialogs');
                            openDialog(result);
                            // close auth menu if it was open
                            vm.dialogAuth = false;
                        });
                    });
                }
            },
            remove: function (dialog) {
                var _this = this;
                AskFast.caller('deleteDialog', {
                    third: dialog.id
                })
                    .then(function () {
                    vm.addingDialog = false;
                    _this.list(function () {
                        vm.dialog = null;
                        if (vm.dialogs[0])
                            vm.dialog = vm.dialogs[0];
                        vm.setSection('dialogs');
                    });
                });
            },
            update: function (dialog, deferred) {
                var _this = this;
                var dialogObject = {
                    id: dialog.id,
                    name: dialog.name,
                    url: dialog.url,
                    owner: dialog.owner
                };
                if (angular.isDefined(dialog.userName) &&
                    angular.isDefined(dialog.password) &&
                    angular.isDefined(dialog.useBasicAuth)) {
                    dialogObject.userName = dialog.userName;
                    dialogObject.password = dialog.password;
                    dialogObject.useBasicAuth = dialog.useBasicAuth;
                }
                AskFast.caller('updateDialog', {
                    third: dialog.id
                }, dialogObject)
                    .then(function (result) {
                    if (deferred) {
                        if (result.error) {
                            deferred.reject(result);
                        }
                        else {
                            deferred.resolve(result);
                        }
                    }
                    _this.list();
                });
            },
            updateDetails: function (dialog) {
                var dialogArr = vm.dialogs.filter(function (_dialog) {
                    if (_dialog.id === dialog.id) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                //we're not updating other properties, reset
                dialog.userName = dialogArr[0].userName;
                dialog.password = dialogArr[0].password;
                this.update(dialog);
            },
            adapters: {
                list: function (dialogId, updated) {
                    var adapters = [];
                    angular.forEach(vm.adapters, function (adapter) {
                        if (updated && updated.id == adapter.id) {
                            adapters.push(updated);
                        }
                        else {
                            if (adapter.dialogId == dialogId)
                                adapters.push(adapter);
                        }
                    });
                    return adapters;
                },
                update: function (dialogId, adapterId) {
                    AskFast.caller('updateAdapter', { second: adapterId }, { dialogId: dialogId })
                        .then(function (adapter) {
                        // vm.dialogAdapters = this.list(dialogId, adapter);
                        vm.Adapter.list();
                    });
                },
                add: function (dialog) {
                    this.update(dialog.id, vm.channel.adapter);
                    vm.resetAdapterMenu();
                    vm.candidates = [];
                    openDialog(dialog);
                },
                remove: function (adapter) {
                    this.update('', adapter.configId);
                }
            },
            open: function (dialog) {
                vm.dialog = angular.copy(dialog);
                // cancel auth notification if any
                vm.Dialog.authentication.notify(null, null, true);
                // will be undefined on first load
                if (angular.isDefined(vm.forms.details)) {
                    vm.forms.details.$setPristine();
                    if (this.adapters.list(dialog.id))
                        vm.dialogAdapters = this.adapters.list(dialog.id);
                }
            },
            authentication: {
                enable: function (dialog) {
                    var _this = this;
                    //check with falsiness, could be null, undefined or empty string
                    if (!!dialog.userName && !!dialog.password) {
                        dialog.useBasicAuth = true;
                    }
                    else {
                        this.notify('Please fill in both a Username and a Password', 'warning');
                        return;
                    }
                    var dialogArr = vm.dialogs.filter(function (_dialog) {
                        if (_dialog.id === dialog.id) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    //we're not updating other properties, reset
                    dialog.name = dialogArr[0].name;
                    dialog.url = dialogArr[0].url;
                    var deferred = $q.defer();
                    vm.Dialog.update(dialog, deferred);
                    deferred.promise
                        .then(function (result) {
                        //success
                        vm.dialogAuth.open = false;
                        _this.notify('Basic Authentication applied successfully', 'success');
                    })
                        .catch(function (result) {
                        //something went wrong, handle it
                        console.log('error -> ', result);
                        _this.notify('Something went wrong with the request', 'danger');
                    });
                },
                disable: function (dialog) {
                    var _this = this;
                    var dialogObj;
                    dialog.useBasicAuth = false;
                    var dialogArr = vm.dialogs.filter(function (_dialog) {
                        if (_dialog.id === dialog.id) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    //we're not updating other properties, reset
                    dialog.name = dialogArr[0].name;
                    dialog.url = dialogArr[0].url;
                    dialogObj = angular.copy(dialog);
                    dialogObj.userName = null;
                    dialogObj.password = null;
                    var deferred = $q.defer();
                    vm.Dialog.update(dialogObj, deferred);
                    deferred.promise
                        .then(function (result) {
                        //success
                        vm.dialogAuth.open = false;
                        _this.notify('Basic Authentication successfully disabled', 'success');
                    })
                        .catch(function (result) {
                        //something went wrong, handle it
                        console.log('error -> ', result);
                        _this.notify('Something went wrong with the request', 'danger');
                    });
                },
                notify: function (message, type, cancel) {
                    if (cancel) {
                        vm.dialogAuth.message = '';
                    }
                    vm.dialogAuth.message = message;
                    vm.dialogAuth.messageType = type;
                    if (vm.authNotifyTimeoutPromise) {
                        $timeout.cancel(vm.authNotifyTimeoutPromise);
                    }
                    vm.authNotifyTimeoutPromise = $timeout(function () {
                        vm.dialogAuth.message = '';
                    }, 6000);
                },
                cancel: function (dialog) {
                    var dialogArr = vm.dialogs.filter(function (_dialog) {
                        if (_dialog.id === dialog.id) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    // Only reset userName and password
                    vm.dialog.userName = dialogArr[0].userName;
                    vm.dialog.password = dialogArr[0].password;
                    vm.dialogAuth.open = false;
                    vm.forms.auth.$setPristine();
                }
            }
        };
        function openDialog(dialog) {
            vm.Dialog.open(dialog);
        }
        vm.authenticateDialog = function (dialog) {
            vm.Dialog.authentication.enable(dialog);
        };
        vm.disableDialogAuthentication = function (dialog) {
            vm.Dialog.authentication.disable(dialog);
        };
        vm.cancelAuthentication = function (dialog) {
            vm.Dialog.authentication.cancel(dialog);
        };
        // grab the list, then select the first if exists
        vm.Dialog.list(function () {
            if (vm.dialogs.length > 0)
                vm.Dialog.open(vm.dialogs[0]);
        });
    }]);
    return coreController;
});
