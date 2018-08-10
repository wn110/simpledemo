package com.pcitc.controller;

import com.pcitc.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.pcitc.model.Order;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class OrderController {

    @Autowired
    OrderService orderService;

    @RequestMapping("queryOrder")
    public String selectOrderByOrderid(Long orderid, HttpServletRequest request){
        Order order = orderService.selectByPrimaryKey(orderid);
        request.setAttribute("order", order);
        return "showOrder" ;
    }

    @RequestMapping("universe")
    @ResponseBody
    public String aa(){
        return "aaa";
    }

}
