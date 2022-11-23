const mongoose = require('mongoose')


// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to DataBase
const db = mongoose.connect('mongodb://localhost:27017/customercli').
    catch(error => handleError(error));


// import model from ./model 

const Customer = require('./Models/customer');

// Add customer

const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
        db.close();
    })
}

//  Find Customer

const findCustomer = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({
        $or: [{ firstname: search }, { lastname: search }]
    }).then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        db.close();
    })
}

// Update customer
const updateCustomer = (_id, customer) => {
    Customer.update({ _id }, customer)
        .then(customer => {
            console.info('Customer Updated');
            db.close()
        })

}


const removeCustomer = (_id) => {
    Customer.remove({ _id })
        .then(customer => {
            console.info('Customer Removed');
            db.close();
        })
}


//  List all customer

const listCustomer = () => {
    Customer.find().then(customers => {
        console.info(customers);
        console.info(`${customer.length} customers`);
        db.close();
    })
}




// Export All methofs

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}
