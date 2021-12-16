<template lang="pug">
  .row.mx-auto.w-75
    .col-12
      .d-flex.justify-content-between.flex-row
        h1 {{ $t(&quot;dashboard.dashboard&quot;) }}
    template(v-if='isLoading')
      #loaderBox
        div
          p-loading-indicator-morph#is-loading.fade.show
            h6.pt-3 {{ $t(&quot;dashboard.loadingDashboard&quot;) }}
    transition-group(name='fade' mode='in-out' style='display: contents')
      template(v-if='!isLoading' style='display: contents')
        .col-12.col-md-5(key='todo-widget')
          p-todo-overview-widget(v-if='pastOrders !== null' :orders='pastOrders')
        .col-12.col-md-7(key='order-widget')
          p-todo-overview-widget(v-if='pastOrders !== null' :orders='pastOrders')
</template>
