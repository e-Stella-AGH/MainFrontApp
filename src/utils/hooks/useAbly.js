import { Realtime } from "ably/browser/static/ably-commonjs.js"
import { v4 as uuid } from 'uuid'

const ably = new Realtime({ key: process.env.REACT_APP_ABLY_KEY })
const id = uuid()

export const useAbly = (channelName) => {

    const channel = ably.channels.get(channelName)
    const pub = (data) => channel.publish('change', data, (err) => err ? console.log(err) : console.log(''))
    const sub = (func) => channel.subscribe(func)

    return { channel, pub, sub, clientId: id }

}
