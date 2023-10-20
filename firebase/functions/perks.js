const express = require('express')
const { ethers } = require('ethers')
const _ = require('lodash');

const { getMongoClient, config, parsePaginationParams, mergeObjects } = require('./utils')
const { idToMarketMap, tradeTypeToDisplayName, marginTypeToDisplayName } = require('./const');
const { haversineDistance } = require('./utils');

const router = express.Router()

let events

const RPC_URL = ''

router.get('/nearest-store', async (req, res) => {
    console.log(req.params, req.query)
    const latitude = req.query.latitude
    const longitude = req.query.longitude

    if (!latitude || !longitude) {
        throw new Error('latitude and longitude are required')
    }


    const provider = ethers.providers.JsonRpcProvider(RPC_URL)
    const vaultAddress = ''
    const vaultAbi = []

    // get it from graph
    const vault = new ethers.Contract(vaultAddress, vaultAbi, provider)
    const allStores = await vault.getAllStores()

    let closestStore = null;
    let closestDistance = Infinity;

    allStores.forEach(store => {
        const distance = haversineDistance(latitude, longitude, store.latitude, store.longitude);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestStore = store;
        }
    });
    console.log("The closest store is:", closestStore.name);

    return res.send({
        store: closestStore,
        distance: closestDistance
    })
})

module.exports = router
