import Vue from 'vue';
import { formatNumberForDisplay } from '@/lib/formatter';

Vue.filter('formatNumber', (value, format) =>
  formatNumberForDisplay(value, format),
);
Vue.filter('roundToNearestThousands', (num) => {
  return num >= 1000 || num <= -1000 ?
    Math.round(num / 1000) * 1000 : num;
});
