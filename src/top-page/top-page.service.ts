import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return await this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return await this.topPageModel.findOne({ alias }).exec();
  }

  async findAll() {
    return await this.topPageModel.find({}).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return await this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async findByText(text: string) {
    return await this.topPageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async deleteById(id: string) {
    return await this.topPageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return await this.topPageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }
}
