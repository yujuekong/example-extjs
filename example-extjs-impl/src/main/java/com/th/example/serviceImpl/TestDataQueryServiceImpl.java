package com.th.example.serviceImpl;

import com.cenboomh.mcc.annotation.FwResource;
import com.cenboomh.mcc.utils.FrameworkBeanCopyUtils;
import com.th.example.entity.TestDataEntity;
import com.th.example.mapper.TestDataMapper;
import com.th.example.service.TestDataQueryService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName: TestDataQueryServiceImpl
 * @Description:
 * @author: acui
 * @date: 2020/1/3 11:27
 */
@Service
public class TestDataQueryServiceImpl implements TestDataQueryService
{
    @FwResource
    private TestDataMapper testDataMapper;

    @Override
    public List<TestDataEntity> selectAll()
    {
        return FrameworkBeanCopyUtils.applys(testDataMapper.selectAll(),TestDataEntity.class);
    }
}
