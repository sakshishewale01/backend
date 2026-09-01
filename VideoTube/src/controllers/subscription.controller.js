import mongoose from "mongoose";

import { Subscription } from "../models/subscription.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleSubscription = asyncHandler(async (req, res) => {

    const { channelId } = req.params;
    const subscriberId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }

    if (subscriberId.toString() === channelId.toString()) {
        throw new ApiError(400, "You cannot subscribe to yourself");
    }

    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId
    });

    if (existingSubscription) {

        await Subscription.findByIdAndDelete(
            existingSubscription._id
        );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { subscribed: false },
                    "Channel unsubscribed successfully"
                )
            );
    }

    await Subscription.create({
        subscriber: subscriberId,
        channel: channelId
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { subscribed: true },
                "Channel subscribed successfully"
            )
        );
});


const getChannelSubscribers = asyncHandler(async (req, res) => {

    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }

    const subscribers = await Subscription.find({
        channel: channelId
    })
    .populate(
        "subscriber",
        "username fullName avatar"
    )
    .sort({
        createdAt: -1
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscribers,
                "Channel subscribers fetched successfully"
            )
        );
});


const getSubscribedChannels = asyncHandler(async (req, res) => {

    const { subscriberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber id");
    }

    const subscriptions = await Subscription.find({
        subscriber: subscriberId
    })
    .populate(
        "channel",
        "username fullName avatar coverImage"
    )
    .sort({
        createdAt: -1
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscriptions,
                "Subscribed channels fetched successfully"
            )
        );
});


export {
    toggleSubscription,
    getChannelSubscribers,
    getSubscribedChannels
};