package com.th.example.service;

import com.cenboomh.mcc.annotation.remoting.RemotingService;
import com.th.example.entity.TestDataEntity;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Produces(RemotingService.CONTENT_TYPE_JSON)
@RemotingService
@Path("/testDataQueryService")
public interface TestDataQueryService
{
    @GET
    @Path("/selectAll")
    List<TestDataEntity> selectAll();

    @POST
    @Path("/save")
    void save(List<TestDataEntity> testDataEntities);
}
