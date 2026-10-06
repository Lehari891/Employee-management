sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], (Controller,History) => {
    "use strict";

    return Controller.extend("employeemanagement.controller.View2", {

       onInit: function () {

    this.getOwnerComponent()
        .getRouter()
        .getRoute("RouteView2")
        .attachPatternMatched(this._objectMatched, this);
},

_objectMatched: function (oEvent) {

    var sEmployeeID =
        oEvent.getParameter("arguments").EmployeeID;

    this.getView().bindElement({
        path: "/Employees(" + sEmployeeID + ")"
    });
},
onNavBack :function(){
    debugger;
    // var oHistory=History.getInstance();
    // var spreviousHash=oHistory.hetPreviousHash();
    // if(spreviousHash!==undefined){
    //     window.history.go(-1);
    // }else{
        this.getOwnerComponent().getRouter().navTo("RouteView1",{},true);
    // }
    

}
   });
});
