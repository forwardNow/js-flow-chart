import { jsPlumb } from 'jsplumb/dist/js/jsplumb.min';
import 'jsplumb/css/jsplumbtoolkit-defaults.css';
import { v4 as uuidv4 } from 'uuid';

import './common/lib/jquery-ui/jquery-ui.min';

import './style.scss';

const $ = window.jQuery;

// this is the paint style for the connecting lines..
const connectorPaintStyle = {
  strokeWidth: 2,
  stroke: '#61B7CF',
  joinstyle: 'round',
  outlineStroke: 'transparent',
  outlineWidth: 2,
};
// .. and this is the hover style.
const connectorHoverStyle = {
  strokeWidth: 3,
  stroke: '#216477',
  outlineWidth: 5,
  outlineStroke: 'white',
};
const endpointHoverStyle = {
  fill: '#216477',
  stroke: '#216477',
};
// the definition of source endpoints (the small blue ones)
const sourceEndpoint = {
  endpoint: 'Dot',
  paintStyle: {
    stroke: '#7AB02C',
    fill: 'transparent',
    radius: 7,
    strokeWidth: 1,
  },
  isSource: true,
  connector: ['Flowchart', {
    stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true,
  }],
  connectorStyle: connectorPaintStyle,
  hoverPaintStyle: endpointHoverStyle,
  connectorHoverStyle,
  maxConnections: 100,
  dragOptions: {},
  overlays: [
    ['Label', {
      location: [0.5, 1.5],
      label: 'Drag',
      cssClass: 'endpointSourceLabel',
      visible: false,
    }],
  ],
};
// the definition of target endpoints (will appear when the user drags a connection)
const targetEndpoint = {
  endpoint: 'Dot',
  paintStyle: { fill: '#7AB02C', radius: 7 },
  hoverPaintStyle: endpointHoverStyle,
  maxConnections: 100,
  dropOptions: { hoverClass: 'hover', activeClass: 'active' },
  isTarget: true,
  overlays: [
    ['Label', {
      location: [0.5, -0.5],
      label: 'Drop',
      cssClass: 'endpointTargetLabel',
      visible: false,
    }],
  ],
};

class FlowChart {
  constructor(id, option = {}) {
    this.$el = $(id);
    this.$stage = this.$el.find('.flow-chart__stage');

    this.jsPlumbIns = jsPlumb.getInstance({
      ConnectionsDetachable: false,
      ConnectionOverlays: [
        ['Arrow', {
          location: 1,
          visible: true,
          width: 11,
          length: 11,
          id: 'ARROW',
          events: {
            click() {
              console.log('you clicked on the arrow overlay');
            },
          },
        }],
      ],
    });

    this.jsPlumbIns.importDefaults({
      Connector: ['Bezier', { curviness: 150 }],
      Anchors: ['LeftCenter', 'RightCenter'],
    });

    this.jsPlumbIns.bind('beforeDrop', ({ sourceId, targetId }) => sourceId !== targetId);
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

        const $newNode = helper.clone();

        this.initNode($newNode);
      },
    });
  }

  initNode($node) {
    const uuid = uuidv4();
    const id = `id-${uuid}`;
    const sourceUUID = `sourceUUID-${uuid}`;
    const targetUUID = `targetUUID-${uuid}`;

    $node.attr('id', id);

    $node.appendTo(this.$stage);
    this.jsPlumbIns.draggable($node, { grid: [5, 5] });

    this.jsPlumbIns.addEndpoint($node, sourceEndpoint, {
      anchor: 'RightMiddle', uuid: sourceUUID,
    });
    this.jsPlumbIns.addEndpoint($node, targetEndpoint, {
      anchor: 'LeftMiddle', uuid: targetUUID,
    });
  }
}

window.FlowChart = FlowChart;

const fc = new FlowChart('#flowChart');

fc.init();
