package com.pcitc.serviceImpl;

import com.pcitc.dao.OrderMapper;
import com.pcitc.model.Order;
import com.pcitc.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("orderService")
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderMapper orderDao;

    @Override
    public Order selectByPrimaryKey(Long orderid) {
        Order order = orderDao.selectByPrimaryKey(orderid);
        return order;
    }
}
