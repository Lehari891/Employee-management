sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend(
        "employeemanagement.controller.Dashboard",
        {

            onInit: function () {

                var oDashboardModel = new JSONModel({
                    greeting: "",
                    date: "",
                    time: ""
                });

                this.getView().setModel(
                    oDashboardModel,
                    "dashboard"
                );

                this._updateDateTime();

                this._timer = setInterval(() => {
                    this._updateDateTime();
                }, 1000);
            },


            _updateDateTime: function () {

                var oNow = new Date();
                var iHour = oNow.getHours();

                var sGreeting;

                if (iHour < 12) {
                    sGreeting = "Good Morning 👋";
                } else if (iHour < 18) {
                    sGreeting = "Good Afternoon 👋";
                } else {
                    sGreeting = "Good Evening 👋";
                }


                var sDate = oNow.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


                var sTime = oNow.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                );


                var oModel =
                    this.getView().getModel("dashboard");

                oModel.setProperty(
                    "/greeting",
                    sGreeting
                );

                oModel.setProperty(
                    "/date",
                    sDate
                );

                oModel.setProperty(
                    "/time",
                    sTime
                );
            },


            onEmployeesPress: function () {

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteView1");
            },


            onAddEmployee: function () {
                // We will create Add Employee next
            },


            onExit: function () {

                if (this._timer) {
                    clearInterval(this._timer);
                }

            }

        }
    );
});