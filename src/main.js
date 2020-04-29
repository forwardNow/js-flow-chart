import { jsPlumb } from 'jsplumb/dist/js/jsplumb.min';
import 'jsplumb/css/jsplumbtoolkit-defaults.css';
import './common/lib/jquery-ui/jquery-ui.min';

import './style.scss';

const $ = window.jQuery;

class FlowChart {
  constructor(id, option = {}) {
    this.$el = $(id);
    this.$stage = this.$el.find('.flow-chart__stage');
  }

  init() {
    $('.fc-widget').draggable({
      helper: 'clone',
      appendTo: this.$stage,
      containment: '.flow-chart',
      stop: (event, ui) => {
        const { helper } = ui;

        const { top, left } = helper.position();

        if (top < 0 || left < 0) {
          return;
        }

        helper.clone().appendTo(this.$stage);
      },
    });
  }
}

window.FlowChart = FlowChart;

const fc = new FlowChart('#flowChart');

fc.init();
