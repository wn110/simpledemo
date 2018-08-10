package com.pcitc.service;

import com.pcitc.model.Order;

public interface OrderService {

    Order selectByPrimaryKey(Long orderid);

}
