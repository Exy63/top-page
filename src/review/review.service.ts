import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DeleteResult } from 'mongodb';
import { Types } from 'mongoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  private reviewModel: ModelType<ReviewModel>;

  сonstructor(
    @InjectModel(ReviewModel)
    reviewModel: ModelType<ReviewModel>,
  ) {
    this.reviewModel = reviewModel;
  }

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(
    productId: string,
  ): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deleteByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
