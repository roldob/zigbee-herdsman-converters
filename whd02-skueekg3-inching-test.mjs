import * as tuya from "zigbee-herdsman-converters/lib/tuya";
import * as reporting from "zigbee-herdsman-converters/lib/reporting";

export default {
    fingerprint: tuya.fingerprint("TS0001", ["_TZ3000_skueekg3"]),
    model: "WHD02",
    vendor: "Tuya",
    description: "Wall switch module - test build with inching support",
    extend: [
        tuya.modernExtend.tuyaBase(),
        tuya.modernExtend.tuyaOnOff({
            switchType: true,
            onOffCountdown: true,
            inchingSwitch: true,
        }),
        tuya.clusters.addTuyaCommonPrivateCluster(),
    ],
    configure: async (device, coordinatorEndpoint) => {
        await tuya.configureMagicPacket(device, coordinatorEndpoint);
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff"]);
        await reporting.onOff(endpoint);
    },
};
