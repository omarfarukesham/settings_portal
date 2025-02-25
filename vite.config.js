/* eslint-env node */

import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// const lazyLoadedModules = [
//   'ProductLists.jsx',
//   'UpdatePrice.jsx',
//   'UploadProduct.jsx',
//   'UploadVariantProduct.jsx',
//   'AddNewCustomer.jsx',
//   'CustomerGroups.jsx',
//   'CustomersList.jsx',
//   'OnlineCustomers.jsx',
//   'AdvancedReports.jsx',
//   'EmailMarketing.jsx',
//   'NewsletterMarketing.jsx',
//   'NewsLetterSubscribers.jsx',
//   'PromoCode.jsx',
//   'PurchaseSuggestion.jsx',
//   'SetBudgetLimit.jsx',
//   'ViewPurchase.jsx',
//   'RefundRequests.jsx',
//   'RMADetails.jsx',
//   'RMANew.jsx',
//   'RMAMain.jsx',
//   'Shipments.jsx',
//   'ShipmentDetails.jsx',
//   'Transaction.jsx',
//   'Campaign.jsx',
//   'ChangeURLRedirect.jsx',
//   'Megaworx.jsx',
//   'RedirectDeletedProduct.jsx',
//   'Robots.jsx',
//   'XMLSitemapLimit.jsx',
//   'AllStore.jsx',
//   'ThemeComponents.jsx',
//   'Dashboard.jsx',
//   'Order.jsx',
//   'CreateNewOrder.jsx',
//   'CreateAttribute.jsx',
//   'Warranty.jsx',
//   'Invoice.jsx',
//   'InvoiceDetails.jsx',
// ];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyze.html', // will be saved in project's root
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (lazyLoadedModules.find((module) => id.endsWith(module))) {
        //     console.log(id);
        //     return id.split('/')[-1];
        //   }
        // },
      },
    },
  },
});
