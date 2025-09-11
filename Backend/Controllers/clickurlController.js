const mongoose = require('mongoose');
const UrlModel = require('../Models/UrlModel');
const { IPinfoWrapper } = require("node-ipinfo");

const ipinfo = new IPinfoWrapper("c8ee482bc992bb");

exports.clickUrl = async (req, resp) => {
    const { id } = req.params;
    const useragentInfo = req.useragent;
    const Clientip = req.ip;
    try {

        //check if the id is there in our dvb
        const url = await UrlModel.findOne({ unqId: id });
        if (!url) {
            console.log('url is not saved in the database!!!');
            return resp.status(404).json({
                success: false,
                message: 'id not found'
            })
        }
        else {
            url.clickCount++;

            if (useragentInfo.isMobile) {
                url.devices.push('Mobile');

            } else if (useragentInfo.isDesktop) {
                url.devices.push('Desktop');
            }
            //getting ip info
            try {
                const response = await ipinfo.lookupIp(Clientip);
                console.log('response from ipinfo',response);
                const locationToSave = response.city || response.region || "Unknown";

                url.locations.push(locationToSave);
            } catch (err) {
                console.log('Error fetching IP info:', err.message);
            }

            const updatedUrl = await url.save();

            resp.redirect(updatedUrl.originalLink);

        }

    } catch (err) {
        console.error(err);
        console.log('error occured while redirecting to the original link', err.message);
        resp.status(502).json({
            success: false,
            message: err.message
        })
    }
}

exports.getUrlData = async (req, resp) => {
    try {
        const {id} = req.params;
        if (!id) {
            return resp.status(502).json({
                success: false,
                message: 'no id recieved in the request'
            })
        }

        //finding the url
        const urldata = await UrlModel.findOne({ unqId: id });
        if (!urldata) {
            console.log('url having this id is not present in the database');
            return resp.status(404).json({
                success: false,
                message: 'url is not present in the database'
            })
        }

        return resp.status(200).json({
            success: true,
            urlData: urldata
        })

    } catch (err) {

        console.log('error occured while fetching url data', err.message);
        console.error(err);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })

    }
}