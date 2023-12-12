import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { teamMock, teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves( teamsMock as TeamsModel[]);

    sinon 
      .stub(TeamsModel, "findOne")
      .resolves(teamMock as TeamsModel);
  });

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
    (TeamsModel.findOne as sinon.SinonStub).restore();
  })

  it('Página devolve lista de times com sucesso', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamsMock);
  });

  it('Página devolve time com sucesso', async () => {
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(teamMock);
  } );

  it('Página devolve erro 404 quando time não existe', async () => {
    // Corrigindo o mock
    (TeamsModel.findOne as sinon.SinonStub).restore();
    sinon 
    .stub(TeamsModel, "findOne")
    .resolves(null);

    const response = await chai.request(app).get('/teams/999');
    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({ message: 'Team 999 not found' });
  } );
});
