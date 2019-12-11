package com.th.example.service;

import com.cenboomh.mcc.annotation.remoting.RemotingService;
import com.th.example.entity.AccAccountEntity;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Produces(RemotingService.CONTENT_TYPE_JSON)
@Path("/accAccountQueryService")
public interface AccAccountQueryService
{
    /**
     * 查询所有账户信息
     * @param
     * @return java.util.List<com.th.example.entity.AccAccountEntity>
     */
    @GET
    @Path("selectAll")
    List<AccAccountEntity> selectAll();
}
