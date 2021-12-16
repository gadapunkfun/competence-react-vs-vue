<script>
import { mapGetters } from "vuex";
import PLoadingIndicatorMorph from "@/components/PLoadingIndicatorMorph.vue";
import PTodoOverviewWidget from "@/metronic-7/view/content/dashboard/PTodoOverviewWidget.vue";
import POrderOverviewWidget from "@/metronic-7/view/content/dashboard/POrderOverviewWidget.vue";
export default {
  data() {
    return {
      isLoading: true,
      currentComponent: "loader",
    };
  },
  components: {
    PTodoOverviewWidget,
    POrderOverviewWidget,
    PLoadingIndicatorMorph,
  },
  computed: {
    ...mapGetters(["pastOrders"]),
  },
  async mounted() {
    if (!this.pastOrders) {
      await this.$store.dispatch("getPastOrders");
    }
    this.isLoading = false;
  },
};
</script>
