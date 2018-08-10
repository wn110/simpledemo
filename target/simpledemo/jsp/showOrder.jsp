<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2018/5/18
  Time: 15:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>订单展示</title>
</head>
<body>

    <table>
        <th>
            <td>订单ID</td>
            <td>${order.orderid}</td>
        </th>
        <tr>
            <td>流水号</td>
            <td>${order.runningNumber}</td>
        </tr>
        <tr>
            <td>订单状态</td>
            <td>${order.orderStatus}</td>
        </tr>
    </table>

</body>
</html>
