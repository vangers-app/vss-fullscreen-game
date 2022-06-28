import vss, { actEventCodes, actintItemEvents, ASMode, RoadRuntimeObjId } from "./vss";

export function init() {
    let isFullScreen = false;
    let forceFullScreen = false;
    vss.addQuantListener("set_road_fullscreen", (payload) => {
        isFullScreen = payload.enabled;
        if (payload.enabled) {
            forceFullScreen = false;
            return;
        }

        if (forceFullScreen) {
            isFullScreen = true;
            forceFullScreen = false;
            return {
                enabled: true,
            };
        }
    });

    function requestFullscreen() {
        if (!isFullScreen) {
            vss.sendEvent(actEventCodes.EV_FULLSCR_CHANGE);
        }
    }

    vss.addQuantListener("send_event", (payload) => {
        if (payload.code === actintItemEvents.ACI_UNLOCK_INTERFACE) {
            forceFullScreen = true;
        }

        if (payload.code === actEventCodes.EV_TELEPORT) {
            isFullScreen = true;
        }

        if (payload.code === actEventCodes.EV_CHANGE_MODE && payload.asMode === ASMode.AS_INV_MODE) {
            requestFullscreen();
        }
    });

    vss.addQuantListener("runtime_object", (payload) => {
        if (payload.runtimeObjectId === RoadRuntimeObjId.RTO_GAME_QUANT_ID) {
            requestFullscreen();
        }
    });
}
