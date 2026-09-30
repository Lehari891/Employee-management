/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["employeemanagement/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
