export const state = () => ({
    title: "Lee's Blog",
    subheader: "迷失的人迷失了,相逢的人会再相逢",
    qrcode: false,
})
export const mutations = {
    setTitle(state, text) {
        state.title = text
    },
    setSubheader(state, text) {
        state.subheader = text
    },
    setQrcode(state, text) {
        state.qrcode = text
    },
}