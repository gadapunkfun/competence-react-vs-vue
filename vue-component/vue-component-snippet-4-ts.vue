<script lang="ts">
import { Component, Vue } from "vue-class-component";
import ordersModule from "@/store/modules/pastOrders";
import PLoadingIndicatorMorph from "@/components/PLoadingIndicatorMorph.vue";
import PTodoOverviewWidget from "@/metronic-7/view/content/dashboard/PTodoOverviewWidget.vue";
import POrderOverviewWidget from "@/metronic-7/view/content/dashboard/POrderOverviewWidget.vue";

@Component({
  components: {
    PTodoOverviewWidget,
    POrderOverviewWidget,
    PLoadingIndicatorMorph,
  },
})
export default class Dashboard extends Vue {
  isLoading: boolean = true;
  currentComponent: string = "loader";

  get pastOrders() {
    return ordersModule.pastOrders;
  }

  async mounted() {
    if (!this.pastOrders) {
      await this.$store.dispatch("getPastOrders");
    }
    this.isLoading = false;
  }
}
</script>
