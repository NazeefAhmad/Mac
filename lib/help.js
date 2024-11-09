////import 'dart:ui';  // For the ImageFilter
////
////import 'package:flutter/material.dart';
////
////void main() {
////  runApp(MaterialApp(
////    home: FloatingDockExample(),
////  ));
////}
////
////class FloatingDockDesktop extends StatefulWidget {
////  final List<DockItem> items;
////
////  const FloatingDockDesktop({
////    Key? key,
////    required this.items,
////  }) : super(key: key);
////
////  @override
////  _FloatingDockDesktopState createState() => _FloatingDockDesktopState();
////}
////
////class _FloatingDockDesktopState extends State<FloatingDockDesktop> {
////  double mouseX = double.infinity;
////  double containerWidth = 0.5; // Default width for the container (50% of the screen width)
////
////  @override
////  Widget build(BuildContext context) {
////    return MouseRegion(
////      onHover: (event) {
////        setState(() {
////          mouseX = event.position.dx;
////          // Adjust container width based on mouse position
////          containerWidth = 0.5 + (mouseX / MediaQuery.of(context).size.width) * 0.3; // Expand width as mouse moves
////        });
////      },
////      onExit: (_) {
////        setState(() {
////          mouseX = double.infinity;
////          containerWidth = 0.5; // Reset to default when mouse exits
////        });
////      },
////      child: BackdropFilter(
////        filter: ImageFilter.blur(sigmaX: 6.0, sigmaY: 6.0), // Applying blur effect
////        child: Container(
////          padding: EdgeInsets.all(16.0),
////          decoration: BoxDecoration(
////            color: Colors.black.withOpacity(0.04), // Add slight opacity for effect
////            borderRadius: BorderRadius.circular(16),
////          ),
////          child: Row(
////            mainAxisAlignment: MainAxisAlignment.center,
////            children: _getItemsWithSpacing(context), // Pass context to get container width
////          ),
////        ),
////      ),
////    );
////  }
////
////  // Generate icons with custom spacing of 2% of the container width between them
////  List<Widget> _getItemsWithSpacing(BuildContext context) {
////    double screenWidth = MediaQuery.of(context).size.width;
////    double adjustedWidth = screenWidth * containerWidth; // Adjust width dynamically
////    double spacing = adjustedWidth * 0.02; // 2% of the container width for spacing
////
////    List<Widget> iconWidgets = [];
////
////    for (int i = 0; i < widget.items.length; i++) {
////      iconWidgets.add(IconContainer(item: widget.items[i], mouseX: mouseX));
////      if (i < widget.items.length - 1) {
////        iconWidgets.add(SizedBox(width: spacing)); // Add 2% spacing between icons
////      }
////    }
////
////    return iconWidgets;
////  }
////}
////
////class IconContainer extends StatelessWidget {
////  final DockItem item;
////  final double mouseX;
////
////  const IconContainer({
////    Key? key,
////    required this.item,
////    required this.mouseX,
////  }) : super(key: key);
////
////  @override
////  Widget build(BuildContext context) {
////    double distance = 100; // Default distance if not calculable
////    try {
////      final RenderBox box = context.findRenderObject() as RenderBox;
////      final offset = box.localToGlobal(Offset.zero);
////      distance = (mouseX - offset.dx).abs();
////    } catch (e) {}
////
////    // Increase max size to 120 and apply smooth transition
////    final double size = (distance < 150) ? (120 - (distance * 0.3)).clamp(60, 120).toDouble() : 60.0;
////
////    return AnimatedContainer(
////      duration: Duration(milliseconds: 300),
////      width: size,
////      height: size,
////      decoration: BoxDecoration(
////        color: Colors.transparent,
////        shape: BoxShape.rectangle,
////        boxShadow: [
////          BoxShadow(
////            color: Colors.transparent,
////            blurRadius: 8,
////            spreadRadius: 2,
////            offset: Offset(0, 4), // Shadow effect on hover
////          ),
////        ],
////      ),
////      child: Center(
////        child: Transform.scale(
////          scale: size / 80, // Smooth scaling of icon
////          child: Image.asset(
////            item.iconPath,
////            width: size,
////            height: size,
////          ),
////        ),
////      ),
////    );
////  }
////}
////
////class DockItem {
////  final String iconPath;
////
////  DockItem(this.iconPath);
////}
////
////class FloatingDockExample extends StatelessWidget {
////  @override
////  Widget build(BuildContext context) {
////    return Scaffold(
////      backgroundColor: Colors.white,
////      body: Center(
////        child: Container(
////          width: MediaQuery.of(context).size.width * 0.5,
////          child: FloatingDockDesktop(
////            items: [
////              DockItem('assets/icon_home.png'),
////              DockItem('assets/icon_search.png'),
////              DockItem('assets/icon_settings.png'),
////              DockItem('assets/icon_contact.png'),
////              DockItem('assets/icon_camera.png'),
////            ],
////          ),
////        ),
////      ),
////    );
////  }
////}
//
//
//import 'dart:ui';
//import 'package:flutter/material.dart';
//
//void main() {
//  runApp(MaterialApp(
//    home: FloatingDockExample(),
//  ));
//}
//
//class FloatingDockDesktop extends StatefulWidget {
//  final List<DockItem> items;
//
//  const FloatingDockDesktop({
//    Key? key,
//    required this.items,
//  }) : super(key: key);
//
//  @override
//  _FloatingDockDesktopState createState() => _FloatingDockDesktopState();
//}
//
//class _FloatingDockDesktopState extends State<FloatingDockDesktop> with TickerProviderStateMixin {
//  double mouseX = double.infinity;
//  double containerWidth = 0.5;
//
//  List<DockItem> currentItems = [];
//
//  @override
//  void initState() {
//    super.initState();
//    currentItems = List.from(widget.items);
//  }
//
//  @override
//  Widget build(BuildContext context) {
//    return MouseRegion(
//      onHover: (event) {
//        setState(() {
//          mouseX = event.position.dx;
//          containerWidth = lerpDouble(0.5, 0.8, event.position.dx / MediaQuery.of(context).size.width);
//        });
//      },
//      onExit: (_) {
//        setState(() {
//          mouseX = double.infinity;
//          containerWidth = 0.5;
//        });
//      },
//      child: BackdropFilter(
//        filter: ImageFilter.blur(sigmaX: 6.0, sigmaY: 6.0),
//        child: AnimatedContainer(
//          duration: Duration(milliseconds: 300),
//          width: MediaQuery.of(context).size.width * containerWidth,
//          padding: EdgeInsets.all(16.0),
//          decoration: BoxDecoration(
//            color: Colors.black.withOpacity(0.04),
//            borderRadius: BorderRadius.circular(16),
//          ),
//          child: Row(
//            mainAxisAlignment: MainAxisAlignment.center,
//            children: _getItemsWithSpacing(context),
//          ),
//        ),
//      ),
//    );
//  }
//
//  List<Widget> _getItemsWithSpacing(BuildContext context) {
//    double screenWidth = MediaQuery.of(context).size.width;
//    double adjustedWidth = screenWidth * containerWidth;
//    double spacing = adjustedWidth * 0.02;
//
//    List<Widget> iconWidgets = [];
//
//    for (int i = 0; i < currentItems.length; i++) {
//      iconWidgets.add(
//        DragTarget<int>(
//          onAccept: (index) {
//            _animateToPosition(i, currentItems[index]);
//            currentItems.removeAt(index);
//            currentItems.insert(i, currentItems[index]);
//          },
//          builder: (context, candidateData, rejectedData) {
//            return Draggable<int>(
//              data: i,
//              childWhenDragging: IconContainer(item: currentItems[i], mouseX: mouseX),
//              feedback: Material(
//                color: Colors.transparent,
//                child: IconContainer(item: currentItems[i], mouseX: mouseX),
//              ),
//              child: IconContainer(item: currentItems[i], mouseX: mouseX),
//            );
//          },
//        ),
//      );
//      if (i < currentItems.length - 1) {
//        iconWidgets.add(SizedBox(width: spacing));
//      }
//    }
//
//    return iconWidgets;
//  }
//
//  void _animateToPosition(int targetIndex, DockItem item) {
//    final RenderBox box = context.findRenderObject() as RenderBox;
//    final itemIndex = currentItems.indexOf(item);
//    final itemBox = box.findRenderObject()!.findRenderObject() as RenderBox;
//
//    final targetX = _calculateTargetX(targetIndex);
//
//    final animationController = AnimationController(
//      vsync: this,
//      duration: Duration(milliseconds: 200),
//    );
//
//    final animation = Tween<double>(begin: itemBox.localToGlobal(Offset.zero).dx, end: targetX)
//        .animate(animationController);
//
//    animationController.addListener(() {
//      setState(() {
//        final offsetX = animation.value - itemBox.localToGlobal(Offset.zero).dx;
//        currentItems[itemIndex] = DockItem(item.iconPath, offsetX: offsetX);
//      });
//    });
//
//    animationController.forward().then((_) {
//      setState(() {
//        currentItems[targetIndex] = DockItem(item.iconPath);
//      });
//    });
//  }
//
//  double _calculateTargetX(int index) {
//    final RenderBox box = context.findRenderObject() as RenderBox;
//    double x = 16.0; // Initial padding
//
//    for (int i = 0; i < index; i++) {
//      final itemBox = box.findRenderObject()!.findRenderObject() as RenderBox;
//      x += itemBox.size.width + 16.0; // Add item width and spacing
//    }
//
//    return x;
//  }
//}
//
//class IconContainer extends StatelessWidget {
//  final DockItem item;
//  final double mouseX;
//
//  const IconContainer({
//    Key? key,
//    required this.item,
//    required this.mouseX,
//  }) : super(key: key);
//
//  @override
//  Widget build(BuildContext context) {
//    double distance = 100;
//
//    try {
//      final RenderBox box = context.findRenderObject() as RenderBox;
//      final offset = box.localToGlobal(Offset.zero);
//      distance = (mouseX - offset.dx).abs();
//    } catch (e) {}
//
//    final double size = (distance < 150) ? (120 - (distance * 0.3)).clamp(60, 120).toDouble() : 60.0;
//
//    return AnimatedContainer(
//      duration: Duration(milliseconds: 300),
//      width: size,
//      height: size,
//      decoration: BoxDecoration(
//        color: Colors.transparent,
//        shape: BoxShape.rectangle,
//        boxShadow: [
//          BoxShadow(
//            color: Colors.transparent,
//            blurRadius: 8,
//            spreadRadius: 2,
//            offset: Offset(0, 4),
//          ),
//        ],
//      ),
//      child: Center(
//        child: Transform.scale(
//          scale: size / 80,
//          child: Image.asset(
//            item.iconPath,
//            width: size,
//            height: size,
//          ),
//        ),
//      ),
//    );
//  }
//}
//
//class DockItem {
//  final String iconPath;
//  final double? offsetX;
//
//  DockItem(this.iconPath, {this.offsetX = 0.0});
//}
//
//class FloatingDockExample extends StatelessWidget {
//  @override
//  Widget build(BuildContext context) {
//    return Scaffold(
//      backgroundColor: Colors.white,
//      body: Center(
//        child: Container(
//          width: MediaQuery.of(context).size.width * 0.5,
//          child: FloatingDockDesktop(
//            items: [
//              DockItem('assets/icon_home.png'),
//              DockItem('assets/icon_search.png'),
//              DockItem('assets/icon_settings.png'),
//              DockItem('assets/icon_contact.png'),
//              DockItem('assets/icon_camera.png'),
//            ],
//          ),
//        ),
//      ),
//    );
//  }
//}