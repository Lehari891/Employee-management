sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("employeemanagement.controller.App", {

        onCollapseExpandPress: function () {

            var oSideNavigation = this.byId("_IDGenSideNavigation");

            oSideNavigation.setExpanded(
                !oSideNavigation.getExpanded()
            );
        },

        onItemSelect: function (oEvent) {

    var oItem = oEvent.getParameter("item");
    var sKey = oItem.getKey();

    if (sKey === "employees") {
        this.getOwnerComponent()
            .getRouter()
            .navTo("RouteView1");
    }

}

    });
});