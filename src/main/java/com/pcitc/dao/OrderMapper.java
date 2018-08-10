package com.pcitc.dao;

import com.pcitc.model.Order;

public interface OrderMapper {
    int deleteByPrimaryKey(Long orderid);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Long orderid);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}