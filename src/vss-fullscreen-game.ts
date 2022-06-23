import vss, { actEventCodes, actintItemEvents, ASMode, RoadRuntimeObjId } from "./vss";

export function init() {
    let consumeNextDisableFullscreen = false;
    vss.addQuantListener("set_road_fullscreen", (payload) => {
        if (payload.enabled) {
            return;
        }

        if (consumeNextDisableFullscreen) {
            consumeNextDisableFullscreen = false;
            return {
                enabled: true,
            };
        }
    });

    vss.addQuantListener("send_event", (payload) => {
        if (payload.code === actintItemEvents.ACI_UNLOCK_INTERFACE) {
            consumeNextDisableFullscreen = true;
        }

        if (payload.code === actEventCodes.EV_CHANGE_MODE && payload.asMode === ASMode.AS_INV_MODE) {
            vss.sendEvent(actEventCodes.EV_FULLSCR_CHANGE);
        }
    });

    vss.addQuantListener("runtime_object", (payload) => {
        if (payload.runtimeObjectId === RoadRuntimeObjId.RTO_GAME_QUANT_ID) {
            vss.sendEvent(actEventCodes.EV_FULLSCR_CHANGE);
        }
    });
}
