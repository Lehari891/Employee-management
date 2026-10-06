sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("employeemanagement.controller.View1", {

        onInit: function () {
            
        },
        onEmployeePress: function (oEvent) {
            

    var oContext = oEvent.getSource().getBindingContext();

    var sEmployeeID = oContext.getProperty("EmployeeID");

    this.getOwnerComponent()
        .getRouter()
        .navTo("RouteView2", {
            EmployeeID: sEmployeeID
        });
},
        

        onSearch: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();

            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter({
                    filters: [
                        new Filter("FirstName", FilterOperator.Contains, sQuery),
                        new Filter("LastName", FilterOperator.Contains, sQuery),
                        new Filter("Title", FilterOperator.Contains, sQuery),
                        new Filter("City", FilterOperator.Contains, sQuery),
                        new Filter("Country", FilterOperator.Contains, sQuery)



                        
                    ],
                    and: false
                });

                aFilters.push(oFilter);
            }

            var oTable = this.byId("idProductsTable");
            var oBinding = oTable.getBinding("items");

            oBinding.filter(aFilters);
        },
        onRefresh: function () { ///this is for refresh

            // Clear search field
            this.byId("_IDGenSearchField").setValue("");

            // Get table
            var oTable = this.byId("idProductsTable");

            // Get items binding
            var oBinding = oTable.getBinding("items");

            // Remove search filters
            oBinding.filter([]);
        }
    });
});
