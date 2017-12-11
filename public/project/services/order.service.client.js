/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .service('orderService', orderService);

    function orderService($http) {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllOrdersForUser = findAllOrdersForUser;
        this.findOrderById = findOrderById;
        this.deleteOrder = deleteOrder;
        this.createOrder = createOrder;
        this.updateOrder = updateOrder;
        this.findAllOrders = findAllOrders;
        this.acceptOrder = acceptOrder;
        this.updateBuyerOrder = updateBuyerOrder;
        this.updateBOrder = updateBOrder;






        function updateBOrder(borderId) {
            var url = "/api/dbproject/reject/order/" + borderId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateBuyerOrder(buyerOrderId, sellerOrderId) {
            var url = "/api/dbproject/borrower/order/" + buyerOrderId;
            var sellerOrder = {sorderId: sellerOrderId};
            return $http.put(url, sellerOrder)
                .then(function (response) {
                    return response.data;
                });
        }


        function acceptOrder(orderId, borderId) {
            var url = "/api/dbproject/accept/order/" + orderId;
            var borderId = {borderId: borderId};
            return $http.put(url, borderId)
                .then(function (response) {
                    return response.data;
                });
        }


        function findAllOrders() {
            var url = "/api/dbproject/orders";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateOrder (orderId, order) {
            var url = "/api/dbproject/order/" + orderId;
            return $http.put(url, order)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createOrder(order, userId){
            var url = "/api/dbproject/user/"+userId+"/order";
            return $http
                        .post(url, order)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteOrder(orderId) {
            var url = "/api/dbproject/order/" + orderId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findOrderById(orderId) {
            var url = " /api/dbproject/order/" + orderId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllOrdersForUser(userId) {
            var url = "/api/dbproject/user/"+userId+"/order";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();