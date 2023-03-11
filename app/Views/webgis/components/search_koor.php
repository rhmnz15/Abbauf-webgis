<div class="panel-fab popup-5 draggable-div" style="width: 400px !important; left: 80% !important; ">
    <div class="header-panel-fab">
        <h4><i class="fa fa-layer-group"></i>&nbsp; Search by Coordinate</h4>
        <div class="searchkoor panel-gear">
            <div id="minimalizemaximalizepanel">
                <button type="button" class="btn btn-default" id="minimize"><i class="fa fa-window-minimize"></i></button>
                <button type="button" class="btn btn-default" id="maximize"><i class="fa fa-window-maximize"></i></button>
            </div>
            <button type="button" class="btn btn-default" id="closepanel"><i class="fa fa-times"></i></button>
        </div>
    </div>
    <div class="body-panel-fab" style="width: 400px !important;">
        <div id="accordion">
            <table>
                <tr>
                    <td><input type="radio" id="dlgsearchbycoordinate_rdodd" name="dlgsearchbycoordinate_rdocoord" value="dd" checked></td>
                    <td><label class="mb-0" for="dlgsearchbycoordinate_rdodd" style="color:black !important;" style="color:black !important;">Decimal Degree</label></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">Longitude:</td>
                    <td style="color:black !important;" style="color:black !important;">Latitude:</td>
                    <td></td>
                </tr>
                <tr class="dd">
                    <td></td>
                    <td>
                        <input id="dlgsearchbycoordinate_dd_lon" type="text" class="txt2" style="width:100px; " />&deg;
                    </td>
                    <td>
                        <input id="dlgsearchbycoordinate_dd_lat" type="text" class="txt2" style="width:100px;" />&deg;
                    </td>
                </tr>
                <tr>
                    <td><input type="radio" id="dlgsearchbycoordinate_rdodms" name="dlgsearchbycoordinate_rdocoord" value="dms"></td>
                    <td><label class="mb-0" style="color:black !important;" style="color:black !important;" for="dlgsearchbycoordinate_rdodms">DMS</label></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">Longitude:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="dms">
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">
                        Degree:<br><input id="dlgsearchbycoordinate_dms_lon_d" type="text" class="txt2" style="width:100px;" disabled />&deg;
                    </td>
                    <td style="color:black !important;" style="color:black !important;">
                        Minute:<br><input id="dlgsearchbycoordinate_dms_lon_m" type="text" class="txt2" style="width:100px;" disabled />'
                    </td>
                    <td style="color:black !important;" style="color:black !important;">
                        Second:<br><input id="dlgsearchbycoordinate_dms_lon_s" type="text" class="txt2" style="width:100px;" disabled />&quot;
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">Latitude:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="dms">
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">
                        Degree:<br><input id="dlgsearchbycoordinate_dms_lat_d" type="text" class="txt2" style="width:100px;" disabled />&deg;
                    </td>
                    <td style="color:black !important;" style="color:black !important;">
                        Minute:<br><input id="dlgsearchbycoordinate_dms_lat_m" type="text" class="txt2" style="width:100px;" disabled />'
                    </td>
                    <td style="color:black !important;" style="color:black !important;">
                        Second:<br><input id="dlgsearchbycoordinate_dms_lat_s" type="text" class="txt2" style="width:100px;" disabled />&quot;
                    </td>
                </tr>
                <tr>
                    <td><input type="radio" id="dlgsearchbycoordinate_rdoutm" name="dlgsearchbycoordinate_rdocoord" value="utm"></td>
                    <td><label class="mb-0" style="color:black !important;" style="color:black !important;" for="dlgsearchbycoordinate_rdoutm">UTM</label></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">Longitude:</td>
                    <td style="color:black !important;" style="color:black !important;">Latitude:</td>
                    <td></td>
                </tr>
                <tr class="utm">
                    <td></td>
                    <td style="color:black !important;" style="color:black !important;">
                        X: <input id="dlgsearchbycoordinate_utm_x" type="text" class="txt2" style="width:100px;" disabled />&deg;
                    </td>
                    <td style="color:black !important;" style="color:black !important;">
                        Y: <input id="dlgsearchbycoordinate_utm_y" type="text" class="txt2" style="width:100px;" disabled />&deg;
                    </td>
                </tr>
            </table>
            <hr>
            <div class="text-center" style="margin-top:20px;">
                <button class="btn1 r btn-sm btn-primary" id="btnsearch">Search</button>
                <div class="c"></div>
            </div>
        </div>
    </div>
</div>