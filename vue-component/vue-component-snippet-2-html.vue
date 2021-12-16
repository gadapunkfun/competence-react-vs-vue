<template>
  <div class="row mx-auto w-75">
    <div class="col-12">
      <div class="d-flex justify-content-between flex-row">
        <h1>{{ $t("dashboard.dashboard") }}</h1>
      </div>
    </div>
    <template v-if="isLoading">
      <div id="loaderBox">
        <div>
          <p-loading-indicator-morph id="is-loading" class="fade show" />
          <h6 class="pt-3">{{ $t("dashboard.loadingDashboard") }}</h6>
        </div>
      </div>
    </template>
    <transition-group name="fade" mode="in-out" style="display: contents">
      <template v-if="!isLoading" style="display: contents">
        <div class="col-12 col-md-5" key="todo-widget">
          <PTodoOverviewWidget
            v-if="pastOrders !== null"
            :orders="pastOrders"
          />
        </div>
        <div class="col-12 col-md-7" key="order-widget">
          <POrderOverviewWidget
            v-if="pastOrders !== null"
            :orders="pastOrders"
          />
        </div>
      </template>
    </transition-group>
  </div>
</template>
