package com.th.example.manager;

import com.cenboomh.mcc.annotation.FwResource;
import com.th.example.mapper.AccAccoutMapper;
import com.th.example.modal.AccAccount;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName: AccAccountManager
 * @Description:
 * @author: acui
 * @date: 2019/12/11 16:44
 */
@Service
public class AccAccountManager
{
    @FwResource
    private AccAccoutMapper accAccoutMapper;

    public List<AccAccount> selectAll(){
        return accAccoutMapper.selectAll();
    }
}
