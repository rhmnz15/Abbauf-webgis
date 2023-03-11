<?php // Maptools button hide 
?>
<div class="maptools-hide"></div>

<div class="maptools-wrapper">
    <div class="maptools-group">
        <button id="zoomin" data-title="Zoom In" type="button"><i class="fa-solid fa-plus"></i></button>
        <button id="zoomout" data-title="Zoom Out" type="button"><i class="fa-solid fa-minus"></i></button>
    </div>
    <div class="maptools-group">
        <button data-title="Search by Coordinate" type="button" class="search"><i class="fa-solid fa-magnifying-glass-location"></i></button>
        <button id="info" data-title="Informasi Details" data-function-active=false type="button"><i class="fa-solid fa-circle-info"></i></button>
        <button type="button" class="text-dark back-to-extent" data-title="Back to Extent"><i class="fa fa-arrows-alt" aria-hidden="true"></i></button>
        <button id="geolocation" data-title="Geolocation" type="button"><i class="fa-solid fa-location-crosshairs fa-lg" aria-hidden="true"></i></button>
        <button id="map3d" data-function-active=false data-title="3D Map" type="button"><i class="fas fa-cube"></i></button>
    </div>
    <div class="maptools-group">
        <button id="distance" data-title="Distance Measurement" geomtype="LineString" type="button"></button>
        <button id="area" data-title="Area Measurement" geomtype="Polygon" type="button" style="border-top: 0px !important;"></button>
        <button id="clear" data-title="Clear Graphics" type="button" style="border-top: 0px !important;"></button>
    </div>
    <div class="maptools-group">
        <button id="gridAnalysis" data-title="Grid Analysis" type="button" class="grid_analysis"><i class="fa fa-th" aria-hidden="true"></i></button>
        <button id="circleAnalysis" data-title="Circle Analysis" type="button"><i class="far fa-circle"></i></button>
        <button data-title="Multiple Grid Analysis" type="button"><i class="fa fa-th-large" aria-hidden="true"></i></button>
        <button data-title="Multiple Circle Analysis" type="button"><i class="fa-solid fa-circle-notch"></i></button>
        <button id="clearAnalysis" data-title="Clear Analysis" type="button"><i class="fa-solid fa-eraser"></i></button>
    </div>
    <div class="maptools-group">
        <button data-title="Graticule Layer" type="button" class="graticule top-50 end-0"><i class="fa-solid fa-grip"></i></button>
        <button data-title="Layer selector" type="button"><i class="fas fa-sticky-note"></i></button>
        <button data-title="Edit Layer" type="button" style="border-top: 0px !important;"><i class="fa-regular fa-pen-to-square"></i></button>
        <button data-title="Remove Layer" type="button" style="border-top: 0px !important;"><i class="fa-solid fa-eraser"></i></button>
    </div>
    <div class="maptools-group">
        <button data-title="Legend" type="button" class="top-50 end-0"><i class="fa-solid fa-table-list"></i></button>
        <button data-title="Add Point" type="button" class="add-vector drawingform" data-type="Point" value="Point"><i class="fa-solid fa-location-dot"></i></button>
        <button data-title="Add Polygon" type="button" class="add-vector drawingform" data-type="Polygon" value="Polygon" style="border-top: 0px !important;"><i class="fas fa-draw-polygon"></i></button>
        <button data-title="Add Line" type="button" class="add-vector drawingform" data-type="LineString" value="LineString" style="border-top: 0px !important;"><i class="fas fa-grip-lines-vertical"></i></button>
        <button data-title="Stop Drawing Tools" type="button" id="stop-drawing-tools" class=" value=" None" style="border-top: 0px !important;"><i class="fa fa-stop-circle" aria-hidden="true"></i></button>
    </div>
</div>