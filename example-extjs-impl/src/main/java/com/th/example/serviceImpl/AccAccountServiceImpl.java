package com.th.example.serviceImpl;

import com.cenboomh.mcc.annotation.FwResource;
import com.cenboomh.mcc.utils.FrameworkBeanCopyUtils;
import com.th.example.entity.AccAccountEntity;
import com.th.example.manager.AccAccountManager;
import com.th.example.service.AccAccountQueryService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName: AccAccountServiceImpl
 * @Description:
 * @author: acui
 * @date: 2019/12/11 16:39
 */
@Service
public class AccAccountServiceImpl implements AccAccountQueryService
{
    @FwResource
    private AccAccountManager accAccountManager;

    @Override
    public List<AccAccountEntity> selectAll()
    {
        return FrameworkBeanCopyUtils.applys(accAccountManager.selectAll(),AccAccountEntity.class);
    }
}
