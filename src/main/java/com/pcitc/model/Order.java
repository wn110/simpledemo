package com.pcitc.model;

import java.util.Date;
import java.text.SimpleDateFormat;

public class Order {
    private Long orderid;

    private String runningNumber;

    private String orderStatus;

    private Integer isDelete;

    private String memberid;

    private String memberName;

    private String memberPhone;

    private String memberRealName;

    private Date createtime;

    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
    }

    public String getRunningNumber() {
        return runningNumber;
    }

    public void setRunningNumber(String runningNumber) {
        this.runningNumber = runningNumber == null ? null : runningNumber.trim();
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus == null ? null : orderStatus.trim();
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public String getMemberid() {
        return memberid;
    }

    public void setMemberid(String memberid) {
        this.memberid = memberid == null ? null : memberid.trim();
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName == null ? null : memberName.trim();
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone == null ? null : memberPhone.trim();
    }

    public String getMemberRealName() {
        return memberRealName;
    }

    public void setMemberRealName(String memberRealName) {
        this.memberRealName = memberRealName == null ? null : memberRealName.trim();
    }

    public String getCreatetime() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(createtime);
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }
}