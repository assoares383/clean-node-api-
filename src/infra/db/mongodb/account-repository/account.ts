import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    const { _id, ...accountWithoutId } = account;
    // eslint-disable-next-line prefer-object-spread
    return Object.assign({}, accountWithoutId, { id: _id });
  }
}
