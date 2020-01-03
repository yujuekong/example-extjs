package com.th.example.serviceImpl;

import com.cenboomh.mcc.annotation.FwResource;
import com.cenboomh.mcc.utils.FrameworkBeanCopyUtils;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.th.example.entity.TestDataEntity;
import com.th.example.mapper.TestDataMapper;
import com.th.example.modal.TestData;
import com.th.example.service.TestDataQueryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

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

    @Transactional
    @Override
    public void save(List<TestDataEntity> testDataEntities)
    {
        List<TestData> insertData = Lists.newArrayList();
        List<TestData> updateData = Lists.newArrayList();
        for(TestDataEntity testDataEntity : testDataEntities){
            if(Strings.isNullOrEmpty(testDataEntity.getId())){
                testDataEntity.setId(UUID.randomUUID().toString());
                insertData.add(FrameworkBeanCopyUtils.apply(testDataEntity,TestData.class));
            }else{
                updateData.add(FrameworkBeanCopyUtils.apply(testDataEntity,TestData.class));
            }
        }
        testDataMapper.updateByPrimaryKeySelectiveList(updateData);
        testDataMapper.insertSelectiveList(insertData);
    }
}
