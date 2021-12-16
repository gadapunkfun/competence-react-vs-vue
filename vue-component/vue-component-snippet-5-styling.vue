<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#loaderBox {
  display: grid;
  place-items: center;
  height: 50vh;
  width: 100vw;
}
</style>

<style lang="sass">
.fade-enter-active, .fade-leave-active
    transition: opacity 0.5s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0;

#loaderBox
    display: grid
    place-items: cente;
    height: 50vh
width: 100vw
</style>
