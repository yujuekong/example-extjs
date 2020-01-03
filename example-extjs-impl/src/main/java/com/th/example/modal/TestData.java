package com.th.example.modal;

import com.cenboomh.hit.framework.mybatis.mapper.annotation.Id;

import java.util.Date;

/**
 * @ClassName: TestData
 * @Description:
 * @author: acui
 * @date: 2020/1/3 11:25
 */
public class TestData
{
    @Id
    private String id;
    private String name;
    private String sex;
    private String desc;
    private Date date;

    public TestData()
    {
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getSex()
    {
        return sex;
    }

    public void setSex(String sex)
    {
        this.sex = sex;
    }

    public String getDesc()
    {
        return desc;
    }

    public void setDesc(String desc)
    {
        this.desc = desc;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }
}
