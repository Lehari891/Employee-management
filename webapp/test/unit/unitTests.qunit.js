/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require([
    "employeemanagement/test/unit/AllTests"
], function () {
    "use strict";

    QUnit.start();
});