package com.th.example.modal;

import com.cenboomh.hit.framework.mybatis.mapper.annotation.Id;
import com.cenboomh.hit.framework.mybatis.mapper.annotation.KeyGeneratorSequenceNo;

import java.util.Date;

/**
 * @ClassName: AccAccount
 * @Description: 用户账户表
 * @author: acui
 * @date: 2019/12/11 16:28
 */
public class AccAccount
{
    /**
     * 主键
     */
    @Id
    @KeyGeneratorSequenceNo
    private Long accountId;
    /**
     * 电话号码
     */
    private String phoneNumber;
    /**
     * 姓名
     */
    private String name;
    /**
     * 账户密码
     */
    private String accountPwd;
    /**
     * 注册时间
     */
    private Date registerTime;

    public AccAccount()
    {
    }

    public Long getAccountId()
    {
        return accountId;
    }

    public void setAccountId(Long accountId)
    {
        this.accountId = accountId;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getAccountPwd()
    {
        return accountPwd;
    }

    public void setAccountPwd(String accountPwd)
    {
        this.accountPwd = accountPwd;
    }

    public Date getRegisterTime()
    {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime)
    {
        this.registerTime = registerTime;
    }
}
