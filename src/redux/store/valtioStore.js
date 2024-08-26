import { proxy } from 'valtio';

const valtioState = proxy({
    activeRoute: "",
    activeHash: "",
    isLogged: false,
    canvasKey: ""
});

export { valtioState }