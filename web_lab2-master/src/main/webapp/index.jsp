<%@ page import="point.PointEntry" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Collections" %>

<%@ page import="point.PointEntry" %>
<%@ page import="point.Results" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
    <title>Lab 2</title>
    <style>
        #container {
            text-align: center;
        }
        [title = "header"] {
            width: 1800px;
            background-color: #a3ffc2;
            padding: 5px;
        }
        [title = "author-name"] {
            font-family: sans-serif;
            font-size: 30px;
        }
        [title = "variant"] {
            font-family: serif;
            font-size: 25px;
        }
        #content {
            background-color: #ffffb8;
            height: 500px;
            width: 1800px;
        }
        #graph {
            background-color: #39f1d9;
            height: 500px;
            width: 800px;
            float: left;
        }
        #x-values input {
            width: 40px;
            font-size: 12px;
            font-family: "Georgia", serif;
        }
        #x-values input:hover {
            color: darkred;
        }
        .x-button input:checked {
            background-color: red;
        }
        #errors
        {
            color : red;
            font-size: 20px;
            font-family: "Georgia", serif;
        }
        #footer {
            background-color: #80daf5;
            text-align: center;
            width: 1800px;
            clear: both;
            text-align: center;
            padding: 5px;
        }
        #result-table {
            width: 1800px;
            border: 1px solid black;
            text-align: center;
            border-collapse: collapse;
        }
        #result-table th {
            font-weight: bold;
            padding: 5px;
            background: #efefef;
            border: 1px solid #dddddd;
        }
        #result-table td {
            border: 1px solid #dddddd;
            padding: 5px;
        }
    </style>
    <meta charset="UTF-8">
</head>
<body onload="init()">
<div id="container">
    <div id="header" title="header">
        <h1>Web programming Lab2</h1>
        <p title="author-name">Ле Фан Фу Куок P3212</p>
        <p title="variant">Variant: 12049</p>
    </div>
    <div id="graph">
        <b>Graph</b>
        <div class="canvas">
            <canvas id="canvas" ></canvas>
        </div>
    </div>
    <div id="content">
        <b>Graph</b>
        <b>Value</b>
        <br />
        <form id="main-form" action="">
            <div class="choice">
            <div id="x"  colspan=2>
                <p class="choice__values">
                    <span class="value">X value</span>
                    <input type="text" name="x" value="" id="x_text_field" >
                </p>
            </div>
            </div>
            <div class="choice">
                <div id="y" colspan=2>
                    <p class="choice__values">
                        <span class="value">Y value</span>
                        <input class="y-checkbox" type="radio" name="y" value="-5">-5
                        <input class="y-checkbox" type="radio" name="y" value="-4">-4
                        <input class="y-checkbox" type="radio" name="y" value="-3">-3
                        <input class="y-checkbox" type="radio" name="y" value="-2">-2
                        <input class="y-checkbox" type="radio" name="y" value="-1">-1
                        <input class="y-checkbox" type="radio" name="y" value="0">0
                        <input class="y-checkbox" type="radio" name="y" value="1">1
                        <input class="y-checkbox" type="radio" name="y" value="2">2
                        <input class="y-checkbox" type="radio" name="y" value="3">3
                    </p>


                </div>
            </div >
            <div class="choice">
                <div id="R"  colspan=2>
                    <p class="choice__values">
                        <span class="value">R value</span>
                        <input type="text" name="x" value="" id="r_text_field" >
                    </p>
                </div>
            </div>
            <div class="choice__button">
                <div id="button_and_errors"  colspan=2>
                    <button type="submit" id="button_submit">Submit</button>
                </div>
            </div>
            <div >
                <div id="errors"  colspan=2>

                </div>
                </div>

        </form>
    </div>

    <div id="footer">
        <table id="result-table" class="result-table">
            <tr class="table-header">
                <th class="coords-col">X</th>
                <th class="coords-col">Y</th>
                <th class="coords-col">R</th>
                <th class="time-col">Current time</th>
                <th class="time-col">Time script</th>
                <th class="hitres-col">Result</th>
            </tr>
            <%
                try {
                    List<PointEntry> list = ((Results) session.getAttribute("results")).getListWithPoints();
                    for (PointEntry result: list) { %>
            <tr>
                <td class="coordX"><%=result.getX()%></td>
                <td class="coordY"><%=result.getY()%></td>
                <td class="coordR"><%=result.getR()%></td>
                <td><%=result.getCurrentTime()%></td>
                <td><%=result.getExecuteTime()%> </td>
                <td><%=result.isInArea()%></td>
            </tr>
            <% }} catch (NullPointerException e)
            {
            }%>
        </table>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script  src="js/main.js"></script>
<script src="js/canvas.js"></script>
</body>
</html>
