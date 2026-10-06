sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Fragment, MessageToast) {
    "use strict";

    return Controller.extend(
        "employeemanagement.controller.Dashboard",
        {

            // =====================================================
            // INITIALIZATION
            // =====================================================
            onInit: function () {

                // JSONModel only for greeting, date and time
                var oDashboardModel = new JSONModel({
                    greeting: "",
                    date: "",
                    time: ""
                });

                this.getView().setModel(
                    oDashboardModel,
                    "dashboard"
                );

                // Show date/time immediately
                this._updateDateTime();

                // Update time every second
                this._timer = setInterval(function () {
                    this._updateDateTime();
                }.bind(this), 1000);
            },


            // =====================================================
            // UPDATE GREETING, DATE AND TIME
            // =====================================================
            _updateDateTime: function () {

                var oNow = new Date();
                var iHour = oNow.getHours();
                var sGreeting;

                // Decide greeting based on current hour
                if (iHour < 12) {
                    sGreeting = "Good Morning 👋";
                } else if (iHour < 18) {
                    sGreeting = "Good Afternoon 👋";
                } else {
                    sGreeting = "Good Evening 👋";
                }


                // Format current date
                var sDate = oNow.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


                // Format current time
                var sTime = oNow.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                );


                // Get dashboard named model
                var oDashboardModel =
                    this.getView().getModel("dashboard");


                // Update model values
                oDashboardModel.setProperty(
                    "/greeting",
                    sGreeting
                );

                oDashboardModel.setProperty(
                    "/date",
                    sDate
                );

                oDashboardModel.setProperty(
                    "/time",
                    sTime
                );
            },


            // =====================================================
            // NAVIGATE TO EMPLOYEE PAGE
            // =====================================================
            onEmployeesPress: function () {

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteView1");
            },


            // =====================================================
            // OPEN ADD EMPLOYEE FRAGMENT
            // =====================================================
            onAddEmployee: function () {

                // Create Fragment only the first time
                if (!this._oAddEmployeeDialog) {

                    Fragment.load({
                        id: this.getView().getId(),
                        name: "employeemanagement.fragment.AddEmployee",
                        controller: this
                    }).then(function (oDialog) {

                        // Store Dialog reference
                        this._oAddEmployeeDialog = oDialog;

                        // Add Dialog as dependent of Dashboard view
                        this.getView().addDependent(oDialog);

                        // Open Dialog
                        oDialog.open();

                    }.bind(this));

                } else {

                    // Dialog already exists
                    this._oAddEmployeeDialog.open();
                }
            },


            // =====================================================
            // SAVE EMPLOYEE USING ODATA V2
            // =====================================================
            onSaveEmployee: function () {

                // Get values from Fragment controls
                var sEmployeeID =
                    this.byId("employeeID")
                        .getValue()
                        .trim();

                var sFirstName =
                    this.byId("employeeFirstName")
                        .getValue()
                        .trim();

                var sLastName =
                    this.byId("employeeLastName")
                        .getValue()
                        .trim();

                var sTitle =
                    this.byId("employeeTitle")
                        .getValue()
                        .trim();

                var oHireDate =
                    this.byId("employeeHireDate")
                        .getDateValue();


                // =================================================
                // VALIDATION
                // =================================================
                if (
                    !sEmployeeID ||
                    !sFirstName ||
                    !sLastName ||
                    !sTitle ||
                    !oHireDate
                ) {

                    MessageToast.show(
                        "Please fill all the fields"
                    );

                    return;
                }


                // =================================================
                // CREATE DATA OBJECT
                //
                // These property names should match the
                // Employees entity in your OData service
                // =================================================
                var oNewEmployee = {

                    EmployeeID: sEmployeeID,

                    FirstName: sFirstName,

                    LastName: sLastName,

                    Title: sTitle,

                    HireDate: oHireDate
                };


                console.log(
                    "Employee data:",
                    oNewEmployee
                );


                // =================================================
                // GET DEFAULT ODATA V2 MODEL
                // =================================================
                var oModel =
                    this.getView().getModel();


                // =================================================
                // CREATE EMPLOYEE
                //
                // POST request will be sent to /Employees
                // =================================================
                oModel.create(
                    "/Employees",
                    oNewEmployee,
                    {

                        // -----------------------------------------
                        // SUCCESS
                        // -----------------------------------------
                        success: function (oData) {

                            console.log(
                                "Employee created successfully:",
                                oData
                            );

                            MessageToast.show(
                                "Employee added successfully"
                            );


                            // Clear Fragment fields
                            this._clearEmployeeForm();


                            // Close Dialog
                            if (this._oAddEmployeeDialog) {
                                this._oAddEmployeeDialog.close();
                            }


                            // Refresh model so latest employee
                            // appears in table
                            oModel.refresh(true);

                        }.bind(this),


                        // -----------------------------------------
                        // ERROR
                        // -----------------------------------------
                        error: function (oError) {

                            console.error(
                                "Error while adding employee:",
                                oError
                            );

                            MessageToast.show(
                                "Failed to add employee"
                            );
                        }
                    }
                );
            },


            // =====================================================
            // CANCEL ADD EMPLOYEE
            // =====================================================
            onCancelEmployee: function () {

                // Clear fields
                this._clearEmployeeForm();

                // Close Dialog
                if (this._oAddEmployeeDialog) {
                    this._oAddEmployeeDialog.close();
                }
            },


            // =====================================================
            // CLEAR ADD EMPLOYEE FORM
            // =====================================================
            _clearEmployeeForm: function () {

                this.byId("employeeID")
                    .setValue("");

                this.byId("employeeFirstName")
                    .setValue("");

                this.byId("employeeLastName")
                    .setValue("");

                this.byId("employeeTitle")
                    .setValue("");

                this.byId("employeeHireDate")
                    .setValue("");
            },


            // =====================================================
            // CLEANUP
            // =====================================================
            onExit: function () {

                // Stop clock interval
                if (this._timer) {

                    clearInterval(this._timer);

                    this._timer = null;
                }
            }

        }
    );
});