import { Enquiry, EnquiryTC } from '../models/enquiry';

const EnquiryQuery = {
    enquiryById: EnquiryTC.getResolver('findById'),
    enquiryByIds: EnquiryTC.getResolver('findByIds'),
    enquiryOne: EnquiryTC.getResolver('findOne'),
    enquiryMany: EnquiryTC.getResolver('findMany'),
    enquiryCount: EnquiryTC.getResolver('count'),
    enquiryConnection: EnquiryTC.getResolver('connection'),
    enquiryPagination: EnquiryTC.getResolver('pagination'),
};

const EnquiryMutation = {
    enquiryCreateOne: EnquiryTC.getResolver('createOne'),
    enquiryCreateMany: EnquiryTC.getResolver('createMany'),
    enquiryUpdateById: EnquiryTC.getResolver('updateById'),
    enquiryUpdateOne: EnquiryTC.getResolver('updateOne'),
    enquiryUpdateMany: EnquiryTC.getResolver('updateMany'),
    enquiryRemoveById: EnquiryTC.getResolver('removeById'),
    enquiryRemoveOne: EnquiryTC.getResolver('removeOne'),
    enquiryRemoveMany: EnquiryTC.getResolver('removeMany'),
};

export { EnquiryQuery, EnquiryMutation };