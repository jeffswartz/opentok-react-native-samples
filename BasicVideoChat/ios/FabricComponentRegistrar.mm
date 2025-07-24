//
//  FabricComponentRegistrar.cpp
//  BasicVideoTS
//
//  Created by Jeff Swartz on 7/23/25.
//

#include "FabricComponentRegistrar.h"

#import <React/RCTComponentViewFactory.h>
#import <React/RCTViewComponentView.h>
#import "OTPublisherViewNativeComponentView.h"
#import "OTSubscriberViewNativeComponentView.h"

@implementation FabricComponentRegistrar

+ (void)registerCustomComponents {
    RCTComponentViewFactory *factory = [RCTComponentViewFactory currentComponentViewFactory];
    [factory registerComponentViewClass:[OTPublisherViewNativeComponentView class]];
    [factory registerComponentViewClass:[OTSubscriberViewNativeComponentView class]];
}

@end
