let config = require('config');
let SHA256 = require("crypto-js/sha256");

let api = {
    getPackagePrice: weight => {
        let price = 0;

        if (weight <= config.get('params.small_package_max_weight')) {
            price = 0.01 * weight;
        } else {
            price = 2 + (0.005 * weight);
        }

        return parseFloat(price.toFixed(2));
    },

    createOrder: packages => {
        let price = packages.reduce((amount, packageItem) => amount + api.getPackagePrice(packageItem.weight), 0);

        let trucks = [];

        // sorting weight for optimal distribution on trucks
        packages = api.orderPackages(packages);

        packages_loop:
            for (let packageItem of packages) {
                for (let truck of trucks) {
                    // check possibility for adding package to truck
                    let newWeight = packageItem.weight + api.getTruckWeight(truck);
                    if (newWeight < config.get('params.truck_max_weight')) {
                        truck.push(packageItem);
                        continue packages_loop;
                    }
                }

                // create new truck if previous overflow
                trucks.push([packageItem]);
            }

        trucks = trucks.map(truck => {
            return {
                truckID: api.generateTruckID(truck),
                load: truck
            }
        });

        return {price: parseFloat(price.toFixed(2)), trucks};
    },

    orderPackages: packages => {
        function compare(a, b) {
            if (a.weight > b.weight) {
                return -1;
            }

            return 1;
        }

        packages.sort(compare);

        return packages;
    },

    getTruckWeight: truck => {
        return truck.reduce((weight, packageItem) => weight + packageItem.weight, 0);
    },

    /* Create trackID from packageIDs */
    generateTruckID: truck => {
        let idString = truck.map(packageItem => packageItem.id).join(':');

        return SHA256(idString).toString();
    }
};

module.exports = api;